import { connectToDatabase } from "@/lib/db"
import Course from "@/models/Course"
import User from "@/models/User"
import Progress from "@/models/Progress"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const course = await Course.findById(params.courseId)

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const user = await User.findById((session.user as any)?.id)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (course.enrolledStudents.includes((session.user as any)?.id)) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 })
    }

    course.enrolledStudents.push((session.user as any)?.id)
    user.enrolledCourses.push(params.courseId)

    await course.save()
    await user.save()

    // Create progress record
    await Progress.create({
      user: (session.user as any)?.id,
      course: params.courseId,
      completedLessons: [],
      quizScores: [],
      progressPercentage: 0,
    })

    return NextResponse.json({ message: "Enrolled successfully" })
  } catch (error) {
    console.error("Error enrolling in course:", error)
    return NextResponse.json({ error: "Failed to enroll" }, { status: 500 })
  }
}

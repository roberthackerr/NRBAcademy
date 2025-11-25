import { connectToDatabase } from "@/lib/db"
import Course from "@/models/Course"
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

    if (course.instructor.toString() !== (session.user as any)?.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    course.published = !course.published
    await course.save()

    return NextResponse.json(course)
  } catch (error) {
    console.error("Error publishing course:", error)
    return NextResponse.json({ error: "Failed to publish course" }, { status: 500 })
  }
}

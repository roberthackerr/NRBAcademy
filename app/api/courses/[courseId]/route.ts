import { connectToDatabase } from "@/lib/db"
import Course from "@/models/Course"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    await connectToDatabase()
    const course = await Course.findById(params.courseId)
      .populate("instructor", "name email bio")
      .populate("lessons")
      .populate("quizzes")

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { courseId: string } }) {
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
      return NextResponse.json({ error: "Not authorized to update this course" }, { status: 403 })
    }

    const updateData = await request.json()
    const updatedCourse = await Course.findByIdAndUpdate(params.courseId, updateData, { new: true })

    return NextResponse.json(updatedCourse)
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { courseId: string } }) {
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
      return NextResponse.json({ error: "Not authorized to delete this course" }, { status: 403 })
    }

    await Course.findByIdAndDelete(params.courseId)
    return NextResponse.json({ message: "Course deleted successfully" })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}

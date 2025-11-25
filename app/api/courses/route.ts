import { connectToDatabase } from "@/lib/db"
import Course from "@/models/Course"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const instructorId = searchParams.get("instructorId")
    const published = searchParams.get("published")

    const query: any = {}
    if (instructorId) query.instructor = instructorId
    if (published === "true") query.published = true

    const courses = await Course.find(query).populate("instructor", "name email").limit(50)

    return NextResponse.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== "instructor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const { title, description, category, level, price } = await request.json()

    const newCourse = await Course.create({
      title,
      description,
      category,
      level,
      price,
      instructor: (session.user as any)?.id,
      published: false,
    })

    return NextResponse.json(newCourse, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}

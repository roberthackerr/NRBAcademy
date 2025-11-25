import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import Progress from "@/models/Progress"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectToDatabase()
    const user = await User.findById(params.userId).populate("enrolledCourses")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const progress = await Progress.find({ user: params.userId })

    return NextResponse.json({
      courses: user.enrolledCourses,
      progress,
    })
  } catch (error) {
    console.error("Error fetching user courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

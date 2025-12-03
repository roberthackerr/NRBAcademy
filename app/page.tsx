"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  ChevronRight,
  PlayCircle,
  Star,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Clock,
  Globe
} from "lucide-react"
import { FaChalkboardTeacher, FaUserGraduate, FaCertificate, FaMobileAlt, FaLaptopCode } from "react-icons/fa"
import { SiCoursera } from "react-icons/si"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

// Composant séparé pour les animations
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100 + delay * 100)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <div 
      className={`transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  const [stats, setStats] = useState([
    { value: "10,000+", label: "Courses", icon: <BookOpen className="h-5 w-5" /> },
    { value: "500+", label: "Expert Instructors", icon: <FaChalkboardTeacher className="h-5 w-5" /> },
    { value: "2M+", label: "Learners", icon: <FaUserGraduate className="h-5 w-5" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <TrendingUp className="h-5 w-5" /> },
  ])

  const features = [
    {
      title: "Interactive Learning",
      description: "Learn through hands-on projects and real-world scenarios",
      icon: <FaLaptopCode className="h-8 w-8" />,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Learn Anywhere",
      description: "Access courses on any device, online or offline",
      icon: <FaMobileAlt className="h-8 w-8" />,
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Global Community",
      description: "Connect with learners and experts worldwide",
      icon: <Globe className="h-8 w-8" />,
      color: "bg-green-100",
      iconColor: "text-green-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/50 to-indigo-50/50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LearnHub
              </h1>
              <p className="text-xs text-gray-500">Elevate Your Learning</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/courses" className="hidden sm:block">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Browse Courses
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 text-blue-600">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center">
          <AnimatedCard delay={0}>
            <Badge variant="secondary" className="mb-8 px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Trusted by 100,000+ learners worldwide
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Career with{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Expert-Led Courses
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Master in-demand skills with industry-recognized certifications. 
              Learn from top professionals and join a global community of learners.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Free Trial
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl border-2 group hover:border-blue-600">
                  <PlayCircle className="mr-2 h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  Explore Courses
                </Button>
              </Link>
            </div>
          </AnimatedCard>

          {/* Stats avec animation séquentielle */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-20">
            {stats.map((stat, index) => (
              <AnimatedCard key={stat.label} delay={index * 0.1}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From beginner to advanced, we provide the tools and support for your learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <AnimatedCard key={feature.title} delay={index * 0.2}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 md:p-8">
                    <div className={`inline-flex p-4 ${feature.color} rounded-2xl mb-6`}>
                      <div className={feature.iconColor}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-sm text-blue-600 font-medium">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <AnimatedCard delay={6}>
          <div className="mt-24 relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative p-8 md:p-12 lg:p-16 text-center text-white">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                  <Star className="h-4 w-4" />
                  Limited Time Offer
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Start Learning Today
                </h2>
                <p className="text-blue-100 mb-8 text-lg md:text-xl">
                  Join now and get your first month free. No commitment, cancel anytime.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                      Get 1 Month Free
                    </Button>
                  </Link>
                  <Link href="/pricing" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                      View Pricing
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Learn at your own pace
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Certificate included
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Community support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">LearnHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering learners worldwide with accessible, high-quality education.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/enterprise" className="hover:text-white transition-colors">
                    For Teams
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:text-white transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
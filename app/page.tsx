"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, Clock, Heart, Shield, Users, Award } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book appointments online 24/7 with our intuitive system",
  },
  {
    icon: Users,
    title: "Expert Doctors",
    description: "Experienced healthcare professionals dedicated to your wellbeing",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Extended hours to fit your busy schedule",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your health data is protected with industry-standard security",
  },
  {
    icon: Heart,
    title: "Patient Care",
    description: "Personalized care tailored to your unique needs",
  },
  {
    icon: Award,
    title: "Certified",
    description: "Accredited facility with top-rated medical staff",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background px-4 py-20 md:py-32">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Your Health is Our <span className="text-primary">Priority</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                Experience exceptional healthcare with our team of expert doctors. Book your appointment today and take
                the first step towards better health.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/appointments">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 w-full max-w-4xl"
            >
              <Card className="border-2">
                <CardContent className="p-0">
                  <img
                    src="/modern-medical-clinic-waiting-room-with-comfortabl.jpg"
                    alt="Clinic waiting room"
                    className="h-[300px] w-full rounded-lg object-cover md:h-[400px]"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Choose Us</h2>
            <p className="mt-4 text-balance text-muted-foreground">
              We provide comprehensive healthcare services with a patient-first approach
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-20 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg opacity-90">
            Book your appointment now and experience quality healthcare that puts you first
          </p>
          <Button size="lg" variant="secondary" className="mt-8" asChild>
            <Link href="/appointments">Schedule Your Visit</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

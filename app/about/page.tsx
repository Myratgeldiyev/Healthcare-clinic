"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useAppointmentStore } from "@/store/appointment-store"

export default function AboutPage() {
  const doctors = useAppointmentStore((state) => state.doctors)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-20">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">About HealthCare Clinic</h1>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg text-muted-foreground">
              For over 20 years, we have been committed to providing exceptional healthcare services to our community.
              Our state-of-the-art facility and experienced medical professionals ensure you receive the best care
              possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/modern-medical-equipment-and-healthcare-facility.jpg"
                alt="Medical facility"
                className="h-[400px] w-full rounded-lg object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                At HealthCare Clinic, our mission is to provide compassionate, high-quality medical care to every
                patient who walks through our doors. We believe in treating the whole person, not just the symptoms, and
                building lasting relationships with our patients.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                We are committed to staying at the forefront of medical innovation while maintaining the personal touch
                that makes our clinic feel like home. Your health and wellbeing are at the center of everything we do.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50k+</div>
                  <div className="text-sm text-muted-foreground">Patients Treated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Specialists</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="bg-muted/50 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Meet Our Doctors</h2>
            <p className="mt-4 text-balance text-muted-foreground">
              Our team of experienced healthcare professionals is here to serve you
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="h-64 w-full object-cover"
                    />
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {doctor.availability.slice(0, 3).map((day) => (
                        <Badge key={day} variant="secondary" className="text-xs">
                          {day.substring(0, 3)}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Values</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Compassion</CardTitle>
                  <CardDescription className="leading-relaxed">
                    We treat every patient with empathy, respect, and understanding, recognizing that healthcare is
                    personal.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Excellence</CardTitle>
                  <CardDescription className="leading-relaxed">
                    We maintain the highest standards in medical care through continuous learning and innovation.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Integrity</CardTitle>
                  <CardDescription className="leading-relaxed">
                    We are honest, transparent, and ethical in all our interactions and medical practices.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

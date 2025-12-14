import Link from "next/link"
import { Calendar, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calendar className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">HealthCare Clinic</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional healthcare services with expert doctors and modern facilities.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-muted-foreground hover:text-primary">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>General Medicine</li>
              <li>Cardiology</li>
              <li>Pediatrics</li>
              <li>Orthopedics</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact Info</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@healthcare.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  123 Medical Center Dr,
                  <br />
                  Health City, HC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HealthCare Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

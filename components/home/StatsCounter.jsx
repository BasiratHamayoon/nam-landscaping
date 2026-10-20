"use client"
import { useSelector } from "react-redux"
import CountUp from "../animations/CountUp"
import FadeIn from "../animations/FadeIn"
import { Award, Users, TreePine, Calendar } from "lucide-react"

const statsIcons = [
  { icon: TreePine, label: "Projects Completed", key: "projectsCompleted", suffix: "+" },
  { icon: Users, label: "Happy Clients", key: "happyClients", suffix: "+" },
  { icon: Calendar, label: "Years Experience", key: "yearsExperience", suffix: "+" },
  { icon: Award, label: "Team Members", key: "teamMembers", suffix: "+" },
]

export default function StatsCounter() {
  const settings = useSelector((state) => state.settings)

  return (
    <section className="py-16 bg-card border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(22,163,74,0.05)_0%,_transparent_50%)]" />

      <div className="container-custom relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsIcons.map((stat, index) => {
            const Icon = stat.icon
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-1">
                    <CountUp end={settings.stats[stat.key]} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground font-body">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
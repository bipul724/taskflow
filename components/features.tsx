'use client'

export function Features() {
  const features = [
    {
      title: 'TaskFlow Boards',
      description: 'Visualize your workflow with intuitive drag-and-drop boards.'
    },
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates and team chat.'
    },
    {
      title: 'Task Automation',
      description: 'Automate repetitive tasks and streamline your workflow.'
    },
    {
      title: 'Advanced Filtering',
      description: 'Find exactly what you need with powerful search and filtering.'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor project progress with detailed analytics and reports.'
    },
    {
      title: 'Integrations',
      description: 'Connect with your favorite tools like Slack, GitHub, and more.'
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Features</h2>
          <p className="text-lg text-muted-foreground">TaskFlow reimagined</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-card rounded-lg border hover:border-primary/50 transition">
              <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

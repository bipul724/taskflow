'use client'

export function Testimonials() {
  const testimonials = [
    {
      author: 'Sarah Chen',
      handle: '@sarahchen',
      quote: 'TaskFlow transformed how our team manages projects. We\'ve cut meeting time in half with better visibility.'
    },
    {
      author: 'Mike Johnson',
      handle: '@mikejohnson',
      quote: 'Finally, a tool that works the way we think. TaskFlow is intuitive yet powerful for complex projects.'
    },
    {
      author: 'Elena Rodriguez',
      handle: '@elrodriguez',
      quote: 'The automation features alone have saved our team hours every week. Highly recommend TaskFlow.'
    },
    {
      author: 'David Kim',
      handle: '@davidkim',
      quote: 'Best decision we made was switching to TaskFlow. Our team productivity increased by 40% in the first month.'
    },
    {
      author: 'Lisa Wong',
      handle: '@lisawong',
      quote: 'The interface is clean and beautiful. No learning curve, and it just works out of the box.'
    },
    {
      author: 'James Mitchell',
      handle: '@jamesmitchell',
      quote: 'TaskFlow replaced three different tools we were using before. Worth every penny and then some.'
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Testimonials</h2>
          <p className="text-lg text-muted-foreground">Loved by teams worldwide</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="p-6 bg-card rounded-lg border">
              <p className="text-foreground mb-4 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

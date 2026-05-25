'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className="text-3xl font-bold tracking-tight text-vero-charcoal sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}



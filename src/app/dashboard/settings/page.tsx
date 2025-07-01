'use client'

import { useState } from 'react'
import {
  Save,
  Mail,
  Phone,
  ShieldAlert,
  Loader2,
  Globe,
  Zap,
  IndianRupee,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface SettingSection {
  id: string
  title: string
  description: string
  icon: any
  fields: Array<{
    id: string
    label: string
    type: 'text' | 'select' | 'toggle'
    value: string | boolean
    options?: string[]
  }>
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('email-verification')

  const settingSections: SettingSection[] = [
    {
      id: 'email-verification',
      title: 'Email or Phone Verification',
      description: 'Toggle whether users must verify email or phone to sign in',
      icon: Mail,
      fields: [
        {
          id: 'requireEmailVerification',
          label: 'Require Email Verification',
          type: 'toggle',
          value: true,
        },
        {
          id: 'requirePhoneVerification',
          label: 'Require Phone Number Verification',
          type: 'toggle',
          value: false,
        },
      ],
    },
    {
      id: 'smtp-health',
      title: 'SMTP Health Check',
      description: 'Configure SMTP ping interval and status monitoring',
      icon: Globe,
      fields: [
        {
          id: 'smtpPingInterval',
          label: 'Ping Interval (minutes)',
          type: 'text',
          value: '5',
        },
        {
          id: 'smtpFailThreshold',
          label: 'Fail Threshold Count',
          type: 'text',
          value: '3',
        },
      ],
    },
    {
      id: 'brute-force',
      title: 'Brute Force Detection',
      description: 'Security threshold to block repeated failed logins',
      icon: ShieldAlert,
      fields: [
        {
          id: 'failedLoginAttempts',
          label: 'Max Failed Login Attempts',
          type: 'text',
          value: '5',
        },
        {
          id: 'blockDuration',
          label: 'Block Duration (minutes)',
          type: 'text',
          value: '60',
        },
      ],
    },
    {
      id: 'currency',
      title: 'Default Currency',
      description: 'Currency to be used across all listings & payments',
      icon: IndianRupee,
      fields: [
        {
          id: 'defaultCurrency',
          label: 'Select Currency',
          type: 'select',
          value: 'INR',
          options: ['INR', 'USD', 'EUR'],
        },
      ],
    },
    {
      id: 'rate-limit',
      title: 'API Rate Limit',
      description: 'Enable rate limiting across public API endpoints',
      icon: Zap,
      fields: [
        {
          id: 'enableRateLimit',
          label: 'Enable Rate Limiting',
          type: 'toggle',
          value: true,
        },
      ],
    },
  ]

  const handleSave = () => {
    console.log('Settings saved')
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500">
            Manage platform-level configurations
          </p>
        </div>
        <Button onClick={handleSave} className="text-xs gap-1">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="w-64 bg-white border rounded-xl p-3 space-y-1">
          {settingSections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              onClick={() => setActiveSection(section.id)}
              className={`w-full justify-start text-xs font-medium ${
                activeSection === section.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <section.icon className="w-4 h-4 mr-2" />
              {section.title}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white border rounded-xl p-6">
          {settingSections.map((section) => (
            <div key={section.id} className={activeSection === section.id ? '' : 'hidden'}>
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-gray-900">{section.title}</h2>
                <p className="text-xs text-gray-500">{section.description}</p>
              </div>

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
                    <Label className="text-xs">{field.label}</Label>
                    <div className="col-span-2">
                      {field.type === 'text' && (
                        <Input value={field.value as string} />
                      )}
                      {field.type === 'select' && (
                        <Select defaultValue={field.value as string}>
                          <SelectTrigger className="w-full h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {field.type === 'toggle' && (
                        <Switch checked={field.value as boolean} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

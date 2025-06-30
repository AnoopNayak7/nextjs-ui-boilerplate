'use client'

import { useState } from 'react'
import { Save, Bell, Lock, Globe, Mail, User, Building, IndianRupee } from 'lucide-react'

interface SettingSection {
  id: string
  title: string
  description: string
  icon: any
  fields: Array<{
    id: string
    label: string
    type: 'text' | 'email' | 'select' | 'toggle' | 'textarea'
    value: string | boolean
    options?: string[]
  }>
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')

  const settingSections: SettingSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      description: 'Basic configuration settings for your platform',
      icon: Globe,
      fields: [
        {
          id: 'siteName',
          label: 'Platform Name',
          type: 'text',
          value: 'UHI Admin'
        },
        {
          id: 'timezone',
          label: 'Default Timezone',
          type: 'select',
          value: 'Asia/Kolkata',
          options: ['Asia/Kolkata', 'UTC', 'America/New_York']
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Configure how you receive notifications',
      icon: Bell,
      fields: [
        {
          id: 'emailNotifications',
          label: 'Email Notifications',
          type: 'toggle',
          value: true
        },
        {
          id: 'notificationTypes',
          label: 'Notification Types',
          type: 'select',
          value: 'all',
          options: ['all', 'important', 'none']
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Manage security settings and permissions',
      icon: Lock,
      fields: [
        {
          id: 'twoFactor',
          label: 'Two-Factor Authentication',
          type: 'toggle',
          value: false
        },
        {
          id: 'sessionTimeout',
          label: 'Session Timeout (minutes)',
          type: 'text',
          value: '30'
        }
      ]
    },
    {
      id: 'property',
      title: 'Property Settings',
      description: 'Configure property-related settings',
      icon: Building,
      fields: [
        {
          id: 'defaultCurrency',
          label: 'Default Currency',
          type: 'select',
          value: 'INR',
          options: ['INR', 'USD', 'EUR']
        },
        {
          id: 'listingDuration',
          label: 'Default Listing Duration (days)',
          type: 'text',
          value: '30'
        }
      ]
    }
  ]

  const handleSave = () => {
    // Implement settings save logic
    console.log('Settings saved')
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500">
            Manage your platform settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs font-medium"
        >
          <Save size={14} className="mr-1" />
          Save Changes
        </button>
      </div>

      <div className="flex gap-4">
        {/* Settings Navigation */}
        <div className="w-64 bg-white rounded-lg shadow-sm border p-3 space-y-1">
          {settingSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <section.icon size={14} className="mr-2" />
              {section.title}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border p-4">
          {settingSections.map((section) => (
            <div
              key={section.id}
              className={activeSection === section.id ? '' : 'hidden'}
            >
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-900">{section.title}</h2>
                <p className="text-xs text-gray-500">{section.description}</p>
              </div>

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-xs font-medium text-gray-700">{field.label}</label>
                    <div className="col-span-2">
                      {field.type === 'text' || field.type === 'email' ? (
                        <input
                          type={field.type}
                          value={field.value as string}
                          onChange={() => {}}
                          className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={field.value as string}
                          onChange={() => {}}
                          className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {field.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'toggle' ? (
                        <div
                          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                            field.value ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}
                          role="switch"
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              field.value ? 'translate-x-4' : 'translate-x-0.5'
                            }`}
                          />
                        </div>
                      ) : null}
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
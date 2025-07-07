'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { westAfricaCountries, defaultCountry } from '@/lib/west-africa-countries'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  defaultCountryCode?: string
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value = '', onChange, defaultCountryCode = 'CI', ...props }, ref) => {
    const [selectedCountry, setSelectedCountry] = React.useState(
      westAfricaCountries.find(c => c.code === defaultCountryCode) || defaultCountry
    )
    const [phoneNumber, setPhoneNumber] = React.useState('')

    React.useEffect(() => {
      // Parse the value if it includes country code
      if (value) {
        const country = westAfricaCountries.find(c => value.startsWith(c.dialCode.replace('+', '')))
        if (country) {
          setSelectedCountry(country)
          setPhoneNumber(value.replace(country.dialCode.replace('+', ''), ''))
        } else {
          setPhoneNumber(value)
        }
      }
    }, [value])

    const handleCountryChange = (countryCode: string) => {
      const country = westAfricaCountries.find(c => c.code === countryCode)
      if (country) {
        setSelectedCountry(country)
        if (onChange && phoneNumber) {
          onChange(country.dialCode.replace('+', '') + phoneNumber.replace(/\s/g, ''))
        }
      }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^\d\s]/g, '')
      setPhoneNumber(value)
      if (onChange) {
        onChange(selectedCountry.dialCode.replace('+', '') + value.replace(/\s/g, ''))
      }
    }

    return (
      <div className="flex gap-2">
        <Select value={selectedCountry.code} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-[145px] bg-white">
            <SelectValue>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedCountry.flag}</span>
                <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {westAfricaCountries.map((country) => (
              <SelectItem key={country.code} value={country.code} className="py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{country.flag}</span>
                  <span className="text-sm font-medium min-w-[45px]">{country.dialCode}</span>
                  <span className="text-sm text-muted-foreground">{country.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Input
          ref={ref}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={selectedCountry.placeholder}
          className={cn('flex-1', className)}
          {...props}
        />
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

export { PhoneInput }
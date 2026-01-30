"use client"

import React, { useEffect, useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, MapPin, DollarSign, Users, Clock, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "../../app/shared/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

interface CreateEventModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface EventFormData {
  title: string
  eventType: string
  date: Date | undefined
  time: string
  location: string
  budget: number
  guestCount: number
  description: string
}

const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Anniversary",
  "Baby Shower",
  "Graduation",
  "Holiday Party",
  "Fundraiser",
  "Product Launch",
  "Other",
]

export function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()
  const { t } = useTranslation()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: {
      eventType: "",
      guestCount: 50,
      budget: 500,
      date: undefined,
      time: "",
      location: "",
      title: "",
      description: ""
    },
  })

  const selectedDate = watch("date")

  useEffect(() => {
    if (!open) {
      // reset UI when modal closes
      setStep(1)
      setSuccess(false)
      reset()
    }
  }, [open, reset])

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true)
    try {
      // simulate API
      await new Promise((r) => setTimeout(r, 900))
      setSuccess(true)
      toast({ title: t('events.create.success.title'), description: t('events.create.success.description') })
      // keep success state briefly so user sees animation
      setTimeout(() => {
        onOpenChange(false)
        setSuccess(false)
        setStep(1)
        reset()
      }, 900)
    } catch (e) {
      toast({ title: t('common.error'), description: t('events.create.error.description'), variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setStep((s) => Math.min(3, s + 1))
  const prevStep = () => setStep((s) => Math.max(1, s - 1))

  // small helpers for accessibility and UI
  const currentProgress = (step / 3) * 100
  const title = watch("title")

  const stepVariants = {
    hidden: { opacity: 0, x: 24 },
    enter: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 30 } },
    exit: { opacity: 0, x: -24, transition: { duration: 0.18 } },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading flex items-center gap-3">
            <span>{t('events.create.title')}</span>
            <span className="text-sm text-muted-foreground">{title ? `— ${title}` : ''}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">{t('events.create.description')}</DialogDescription>
        </DialogHeader>

        {/* Progress bar + Step labels */}
        <div className="px-6 mt-4">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgress}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </div>

          {/* Step labels with translations */}
          <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
            <div className={cn('flex items-center gap-2', step === 1 && 'text-primary')}>
              1. {t('events.create.steps.details')}
            </div>
            <div className={cn('flex items-center gap-2', step === 2 && 'text-primary')}>
              2. {t('events.create.steps.whenWhere')}
            </div>
            <div className={cn('flex items-center gap-2', step === 3 && 'text-primary')}>
              3. {t('events.create.steps.budget')}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <AnimatePresence mode="wait" initial={false}>
            {!success ? (
              <div key={`form-step-${step}`} variants={stepVariants} initial="hidden" animate="enter" exit="exit">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">{t('events.create.fields.title')}</Label>
                      <Input
                        id="title"
                        placeholder={t('events.create.placeholders.title')}
                        className="ring-1 ring-transparent focus:ring-primary/50 transition-shadow"
                        {...register('title', { required: t('events.create.validation.titleRequired') })}
                        aria-invalid={!!errors.title}
                      />
                      {errors.title && <p role="alert" className="text-sm text-destructive">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventType">{t('events.create.fields.eventType')}</Label>
                      <Controller
                        control={control}
                        name="eventType"
                        rules={{ required: t('events.create.validation.eventTypeRequired') }}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={t('events.create.placeholders.eventType')} />
                            </SelectTrigger>
                            <SelectContent>
                              {eventTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {t(`events.types.${type.toLowerCase().replace(/\s+/g, '')}`) || type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.eventType && <p className="text-sm text-destructive">{errors.eventType.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">{t('events.create.fields.description')}</Label>
                      <Textarea id="description" placeholder={t('events.create.placeholders.description')} className="min-h-[120px]" {...register('description')} />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">{t('events.create.fields.date')} *</Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="date"
                          type="date"
                          className="pl-10"
                          {...register('date', {
                            required: t('events.create.validation.dateRequired'),
                            setValueAs: (value) => value ? new Date(value) : undefined
                          })}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">{t('events.create.fields.time')}</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="time" type="time" className="pl-10" {...register('time', { required: t('events.create.validation.timeRequired') })} />
                      </div>
                      {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="location">{t('events.create.fields.location')}</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="location" placeholder={t('events.create.placeholders.location')} className="pl-10" {...register('location', { required: t('events.create.validation.locationRequired') })} />
                      </div>
                      {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guestCount">{t('events.create.fields.guestCount')}</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="guestCount"
                          type="number"
                          placeholder="150"
                          className="pl-10"
                          {...register('guestCount', {
                            required: t('events.create.validation.guestCountRequired'),
                            min: { value: 1, message: t('events.create.validation.guestCountMin') },
                            valueAsNumber: true
                          })}
                        />
                      </div>
                      {errors.guestCount && <p className="text-sm text-destructive">{errors.guestCount.message}</p>}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">{t('events.create.fields.budget')}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="budget"
                          type="number"
                          placeholder="50000"
                          className="pl-10"
                          {...register('budget', {
                            required: t('events.create.validation.budgetRequired'),
                            min: { value: 100, message: t('events.create.validation.budgetMin') },
                            valueAsNumber: true
                          })}
                        />
                      </div>
                      {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
                      <p className="text-sm text-muted-foreground">{t('events.create.budgetHelp')}</p>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{t('events.create.nextSteps.title')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• {t('events.create.nextSteps.step1')}</li>
                        <li>• {t('events.create.nextSteps.step2')}</li>
                        <li>• {t('events.create.nextSteps.step3')}</li>
                        <li>• {t('events.create.nextSteps.step4')}</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="ghost" onClick={prevStep} disabled={step === 1}>{t('common.previous')}</Button>
                    {/* Step counter with translation */}
                    <div className="text-sm text-muted-foreground">
                      {t('events.create.steps.counter').replace('{step}', step.toString())}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2"
                        disabled={
                          (step === 1 && (!watch("title") || !watch("eventType"))) ||
                          (step === 2 && (!watch("date") || !watch("time") || !watch("location") || !watch("guestCount")))
                        }
                      >
                        {t('common.next')}
                      </Button>
                    ) : (
                      <Button type="submit" className="gradient-royal text-white flex items-center gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <span className="animate-pulse">{t('events.create.creating')}</span>
                        ) : (
                          <>
                            <span>{t('events.create.createButton')}</span>
                            <Check className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // success animation
              <div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12">
                <div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="bg-green-50 rounded-full p-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{t('events.create.success.title')}</h3>
                <p className="text-sm text-muted-foreground mt-2">{t('events.create.success.description')}</p>
              </div>
            )}
          </AnimatePresence>
        </form>
      </DialogContent>
    </Dialog>
  )
}
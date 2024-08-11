'use client'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { updateWebinar } from '@/services/admin/webinar-service'
import  { useState } from 'react'


const WebinarActiveToggle = ({
  value = false,
  onChange,
  selfMode
}: {
  value?: boolean,
  onChange?: (value: boolean) => void,
  selfMode?: {
    webinarId: string
  }
}) => {
  const [isActive, setIsActive] = useState(value || false)
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast()

  const handleOnChange = async (value: boolean) => {
    if (!selfMode) {
      onChange?.(value);
      return;
    }
    const res = await updateStatus(selfMode.webinarId, value);
    if (res) {
      onChange?.(res || false);
      setIsActive(res || false);
    }
  }

  const updateStatus = async (id: string, isActive: boolean) => {
    try {
      setLoading(true)
      const res = await updateWebinar(id, { isActive });
      return res.isActive;
    } catch (error: any) {
      toast({ title: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <span className='inline-flex items-center justify-center'>
      <Switch
        checked={value}
        onCheckedChange={handleOnChange}
        disabled={loading}
      />
      {
        isActive || value ? "Active" : "InActive"
      }
    </span>
  )
}

export default WebinarActiveToggle
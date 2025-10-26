'use client'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { updateWebinar } from '@/services/admin/webinar-service'
import  { useState } from 'react'
import { usePermission } from '@/hooks/usePermissions'
import { WEBINAR_PERMISSIONS } from '@/constants/permissions'
import { handlePermissionError } from '@/lib/permissionErrorHandler'

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
  const canPublishWebinar = usePermission(WEBINAR_PERMISSIONS.WEBINAR_PUBLISH);

  const handleOnChange = async (value: boolean) => {
    if (!canPublishWebinar) {
      toast({ title: "Permission Denied", description: "You don't have permission to publish/unpublish webinars", variant: 'destructive' });
      return;
    }
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
      handlePermissionError(error, 'Failed to update webinar status');
      toast({ title: `Error: ${error.message}`, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  if (!canPublishWebinar) {
    return null;
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
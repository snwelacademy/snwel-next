import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTotalEnrolledUsers } from '@/hooks/useAnalytics';
import { getCurrencySymbol } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function RecentSales() {
  const { data } = useTotalEnrolledUsers()
  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          You made {data?.total} sales this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {
            data?.docs.map(d => {
              return <>
                <div className="flex items-center">
                  <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src={d.userId.profilePic} alt="Avatar" />
                    <AvatarFallback>{d.userId.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{d.userId.name}</p>
                    <p className="text-sm text-muted-foreground">{d.userId.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{`${getCurrencySymbol(d.courseId?.currency||'INR')} ${d.courseId?.price}`}</div>
                </div>
              </>
            })
          }

        </div>
      </CardContent>
    </Card>
  );
}
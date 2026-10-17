import DashboardPreview from "@/components/DashboardPreview"
import { useElementWidth } from "@/hooks/use-element-width"
import { cn } from "@/lib/utils"

const W = 677
const H = 537

/** DashboardPreview scaled to fill the width of its parent. */
export default function ScaledDashboard({ className }) {
  const [ref, width] = useElementWidth()
  const scale = width / W

  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ height: width ? H * scale : undefined }}>
      {width > 0 && (
        <DashboardPreview className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${scale})` }} />
      )}
    </div>
  )
}

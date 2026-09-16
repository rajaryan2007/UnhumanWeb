import * as React from "react"

import { cn } from "@/lib/utils"

const Divider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    className={cn("border-border", className)}
    ref={ref}
    {...props}
  />
))
Divider.displayName = "Divider"

export { Divider }

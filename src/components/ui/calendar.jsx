import*asReactfrom"react";
import { ChevronLeft,ChevronRight } from"lucide-react";
import { DayPicker } from"react-day-picker";

import { cn } from"@/lib/utils";
import { buttonVariants } from"@/components/ui/button";

export

functionCalendar({className,classNames,showOutsideDays=true,...props}:CalendarProps){
return(
<DayPicker
showOutsideDays={showOutsideDays}
className={cn("p-3",className)}
classNames={{
months:"flexflex-colsm:flex-rowspace-y-4sm:space-x-4sm:space-y-0",
month:"space-y-4",
caption:"flexjustify-centerpt-1relativeitems-center",
caption_label:"text-smfont-medium",
nav:"space-x-1flexitems-center",
nav_button:cn(
buttonVariants({variant:"outline"}),
"h-7w-7bg-transparentp-0opacity-50hover:opacity-100",
),
nav_button_previous:"absoluteleft-1",
nav_button_next:"absoluteright-1",
table:"w-fullborder-collapsespace-y-1",
head_row:"flex",
head_cell:"text-muted-foregroundrounded-mdw-9font-normaltext-[0.8rem]",
row:"flexw-fullmt-2",
cell:"h-9w-9text-centertext-smp-0relative[&:has([aria-selected].day-range-end)]:rounded-r-md[&:has([aria-selected].day-outside)]:bg-accent/50[&:has([aria-selected])]:bg-accentfirst:[&:has([aria-selected])]:rounded-l-mdlast:[&:has([aria-selected])]:rounded-r-mdfocus-within:relativefocus-within:z-20",
day:cn(buttonVariants({variant:"ghost"}),"h-9w-9p-0font-normalaria-selected:opacity-100"),
day_range_end:"day-range-end",
day_selected:
"bg-primarytext-primary-foregroundhover:bg-primaryhover:text-primary-foregroundfocus:bg-primaryfocus:text-primary-foreground",
day_today:"bg-accenttext-accent-foreground",
day_outside:
"day-outsidetext-muted-foregroundopacity-50aria-selected:bg-accent/50aria-selected:text-muted-foregroundaria-selected:opacity-30",
day_disabled:"text-muted-foregroundopacity-50",
day_range_middle:"aria-selected:bg-accentaria-selected:text-accent-foreground",
day_hidden:"invisible",
...classNames,
}}
components={{
IconLeft:({..._props})=><ChevronLeftclassName="h-4w-4"/>,
IconRight:({..._props})=><ChevronRightclassName="h-4w-4"/>,
}}
{...props}
/>
);
}
Calendar.displayName="Calendar";

export{Calendar};



import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function UserAvatar({name}:
  {name: string}
) {
  return (
    <div className="flex items-center gap-1.5">
 <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
     <p className="font-semibold text-sm">{name}</p>
    </div>
   
  )
}

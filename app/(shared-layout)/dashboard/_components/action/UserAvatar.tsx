

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function UserAvatar({name}:
  {name: string}
) {

  
  return (
    <div className="items-center gap-1.5 flex">
 <Avatar>
      <AvatarImage
        src="/user.png"
        alt="User avatar image"
        
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
     <p className="font-semibold">{name}</p>
    </div>
   
  )
}

import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const Addresscard = ({addressinfo,handleDeleteAddress,handleEditAddress}) => {
  return (
    <Card>
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressinfo?.address}</Label>
        <Label>City: {addressinfo?.city}</Label>
        <Label>PinCode: {addressinfo?.pincode}</Label>
        <Label>phone Number: {addressinfo?.phone}</Label>
        <Label>Notes: {addressinfo?.notes}</Label>
      </CardContent>
      <CardFooter className='flex justify-between items-center p-3'>
        <Button onClick={()=>handleEditAddress(addressinfo)}>Edit</Button>
        <Button onClick={()=>handleDeleteAddress(addressinfo)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default Addresscard
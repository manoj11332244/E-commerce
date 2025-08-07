import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectTrigger, SelectValue,SelectItem } from '../ui/select';
import { Button } from '../ui/button';

const CommonForm = ({ formControl,formData,setFormData,onSubmit, buttonText}) => {

    const renderInputByComponentType = (getControlItem) => {
        let element = null;
        const value = formData[getControlItem.name] || "";
        switch (getControlItem.ComponentType) {
            case 'input':
                element = (<Input name={getControlItem.name} onChange={e=>setFormData({...formData,[getControlItem.name]:e.target.value})} placeholder={getControlItem.placeholder} id={getControlItem.name} type={getControlItem.type} />);
                break;

            case 'select':
                element= (<Select onValueChange={(value)=>setFormData({...formData,[getControlItem.name]:value})} value={value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={getControlItem.label} />
                    </SelectTrigger>
                    <SelectContent>
                        {getControlItem.options && getControlItem.options.length > 0
                            ? getControlItem.options.map((optionItem) => (
                                <SelectItem key={optionItem.id} value={optionItem.id}>
                                    {optionItem.label}
                                </SelectItem>
                            ))
                            : null}
                    </SelectContent>
                </Select>)
                break;

            case 'textarea':
                element= (<Textarea name={getControlItem.name} onChange={e=>{setFormData({...formData,[getControlItem.name]:e.target.value})}} placeholder={getControlItem.placeholder} id={getControlItem.id} value={value} />)
                break;
            default:
                element = (<Input name={getControlItem.name} onChange={e=>{setFormData({...formData,[getControlItem.name]:e.target.value})}} placeholder={getControlItem.placeholder} id={getControlItem.name} type={getControlItem.type} value={value} />)
        }
        return element;
    }
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            onSubmit()
        }}>
            <div className='flex flex-col gap-3'>
                {
                    formControl.map((controlItem) => <div className='grid w-full gap-1.5' key={controlItem.name}>
                        <Label className='mn-1'>{controlItem.label}</Label>
                        {
                            renderInputByComponentType(controlItem)
                        }

                    </div>)
                }
            </div>
            <Button type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default CommonForm
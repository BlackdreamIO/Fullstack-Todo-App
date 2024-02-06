import { Container } from '@/components/container/container'
import { Input } from '@/components/cva/input/input'
import { Button } from '@/components/cva/button/cvaButton'
import React from 'react'

export default function CreateColumn() 
{
    return (
        <Container className={'w-full dark:bg-slate-900'} flow='row'>
            <Input className='w-full' placeholder='text' />
            <Button intent='primary' className='p-0' size='small' width='xs'>+</Button>
        </Container>
    )
}

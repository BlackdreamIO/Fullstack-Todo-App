import { Container } from '@/components/container/container'
import { Input } from '@/components/cva/input/input';
import { Button } from '@/components/cva/button/cvaButton';

export default function CreateTaskGroup() 
{
    return (
        <Container className={'w-full'} flow='row'>
            <Input className='w-full dark:bg-black' placeholder='text' />
            <Button 
                intent='primary' 
                size='small' 
                width='xs'
                className='dark:bg-amber-500 dark:hover:bg-amber-500 bg-amber-500
                p-1'>
                    +
            </Button>
        </Container>
    )
}

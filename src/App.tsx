import React, { useCallback } from 'react';
import { json } from 'stream/consumers';
import './App.css';

const data = [`ali`, `amir`, `mahdi`];

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

const todoData: Todo[] = [
  { id: 1, text: `yooo`, done: false },
  { id: 2, text: `booo`, done: false },
  { id: 3, text: `fooo`, done: false },
  { id: 4, text: `barrr`, done: false },
];



type HeadingType = {
  title: string
}
type ListType = {
  items: string[];
  onClick?: (item: string) => void
}
type ULType<T> = {
  items: T[];
  onClick: (item: T) => void
}
type ButtonRestrictProps = {
  variant: 'primary' | 'secondary';
  children: string;
} & Omit<React.ComponentProps<'button'>, 'children'>

type UnorderListProps<T> = {
  items: T[];
  render: (item: T) => React.ReactNode
} & React.ComponentProps<'ul'>

type OrderListProps<T> = {
  items: T[];
  render: (item: T) => React.ReactNode
} & React.ComponentProps<'ol'>

const Heading = ({title}: HeadingType) => <h2>{title}</h2>
const HeadingLike = (props: React.ComponentProps<typeof Heading>) => <>{props.title}</>
const Box = ({children}: {children: React.ReactNode}) => <h2>{children}</h2>
const StringBox = ({children}: {children: string}) => <h2>{children}</h2>
const Style = ({style}: {style: React.CSSProperties}) => <h2 style={style}>It is React.CSSProperties!</h2>
const Test = () => <p>It's a test component</p>
const Route = ({component: Component}: {component: React.ComponentType}) => <Component />
const RouteWithProp = ({component: Component}: {component: React.ComponentType<HeadingType>}) => <Component title='its a component with strange title props' />
const List: React.FC<ListType> = ({items, onClick}) => (
  <ul>
    {items.map((item, ind) => (
      <li onClick={() => onClick?.(item)} key={ind}>{item}</li>
    ))}
  </ul>
)
const UList = <T extends {id: number}>({items, onClick}: ULType<T>) => ( 
  <ul>
    {items.map((item) => (
      <li onClick={() => onClick(item)} key={item.id}>{JSON.stringify(item)}</li>
    ))}
  </ul>
)
const Button = (props: React.ComponentProps<'button'>) => <button {...props}>{props.children}</button>
const ButtonTwo = ({children, ...rest}:React.ComponentProps<'button'>) => <button {...rest}>{children}</button>
const ButtonThree = ({variant, children, ...rest}:ButtonRestrictProps) => (
  <button className={`flex ${variant}`} {...rest}>{children}</button>
)
const UnorderList = <T extends {id: number}>({items, render, ...rest}: UnorderListProps<T>) => (
  <ul {...rest}>
    {items.map((item) => (
      <li key={item.id}>{render(item)}</li>
    ))}
  </ul>
)

function OL<T>({items, render, ...rest}: OrderListProps<T>){
  return(
    <ol {...rest}>
      {items.map((item, ind) => (
      <li key={ind}>{render(item)}</li>
      ))}
    </ol>
  )
}


function App() {
  const LisrRender = useCallback((item: Todo) => {
    return(
      <>
        {item.text}
        <button onClick={() => console.log(`Removed ${item.text}`)}>Remove</button>
      </>
    )
  }, [])
  return (
    <div className="App">
     <Heading title="Yooo world" />
     <HeadingLike title="like Heading components type" />
     <Box><div>Another Yoo world</div></Box>
     <StringBox>just string Yoo world</StringBox>
     <Style style={{color: `red`}} />
     <Route component={Test} /> 
     <RouteWithProp component={Heading} /> 
     <List items={data} onClick={(item) => console.log(item)} />
     <UList items={todoData} onClick={(item) => console.log(item)} />
     <Button>Yooo</Button>
     <Button onClick={() => alert('w')}><h1>h1Yooo</h1></Button>
     <ButtonTwo>button</ButtonTwo>
     <ButtonThree variant='secondary'>buttonRistrict</ButtonThree>
     <UnorderList items={todoData} render={LisrRender} />
     <OL items={todoData} render={LisrRender} />
    </div>
  );
}

export default App;

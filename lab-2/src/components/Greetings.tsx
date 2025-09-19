type GreetingsProps = {
  name: string
  message: string
}

export default function Greetings(props: GreetingsProps) {
  return (
    <h2>
      {props.message}, {props.name}!
    </h2>
  )
}

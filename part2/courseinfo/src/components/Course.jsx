const Course = ({courses}) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <CourseHeader name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
          </div>
        )
      })}
    </div>
  )
}

const CourseHeader = (props) => {
  return ( 
    <>
      <h2>{props.name}</h2>
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return (
  <>
    {props.parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises}/>    
    )}
  </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Total = (props) => {
  const total = props.parts.reduce(
    (acc, cur) => acc + cur.exercises, 0);
  
  return (
    <>
      <p><b>total of {total} exercises</b></p>
    </>
  )
}
 
 export default Course;

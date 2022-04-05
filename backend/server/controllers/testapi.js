// A helloworld endpoint to tests if express is working
export const helloWorld = async (req, res) => {
  res.status(200).send('Hello World!')
}

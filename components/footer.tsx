import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-6 flex flex-col items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://nagu.dev"
              className="mx-3 font-bold hover:underline"
            >
              nagu.dev
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

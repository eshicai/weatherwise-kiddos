import './Feedback.scss'
import { Header } from '../../components/Header/Header';
import { Slogan } from '../../components/Slogan/Slogan';
import { BackwardLink } from '../../components/BackwardLink/BackwardLink';
import { FeedbackForm } from '../../components/FeedbackForm/FeedbackForm';

export const Feedback = ({ user }) => {

  return (
    <div className="feedback">
      <Header className='feedback__header' user={user} />
      <main className='feedback-main'>
        <div className="feedback-main__backward-link-container">
          <BackwardLink className="feedback-main__backward-link" link="/" heading='Today' />
        </div>
        <div className="feedback-main__info">
          <FeedbackForm />
        </div>
      </main>
      <Slogan className="feedback__slogan" />
    </div>
  )
}
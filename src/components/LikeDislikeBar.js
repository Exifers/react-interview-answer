import React, {useEffect, useState} from 'react';
import './LikeDislikeBar.css';

function LikeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className='like-icon'
      height="24"
      viewBox="0 0 24 24"
      width="24">
      <path d="M0 0h24v24H0V0z"
            fill="none"/>
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
    </svg>
  );
}

function DislikeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className='dislike-icon'
      height="24"
      viewBox="0 0 24 24"
      width="24">
      <path d="M0 0h24v24H0z"
            fill="none"/>
      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
    </svg>
  );
}

function format(number) {
  if (number > 999) {
    return Math.round(number / 1000) + 'k';
  }
  return number;
}

/* A Youtube like like-dislike component
 * like: if true, the user liked this
 *       if false, the user disliked this
 *       if null, the user didn't give any feedback
 */
function LikeDislikeBar({likes, dislikes, liked, onLike}) {
  useEffect(() => {
    // eslint-disable-next-line
    $(function () {
    // eslint-disable-next-line
      $('[data-toggle=\'tooltip\']').tooltip()
    })
  }, []);

  const handleLike = (event) => {
    event.preventDefault();
    onLike(liked === true ? null : true);
  }

  const handleDislike = (event) => {
    event.preventDefault();
    onLike(liked === false ? null : false);
  }

  const totalLikes = likes + (liked === true ? 1 : 0);
  const totalDislikes = dislikes + (liked === false ? 1 : 0);
  const ratio = 100 * totalLikes / (totalLikes + totalDislikes);

  return (
    <div className={`like-dislike-bar ${liked !== null && 'active'}`}>
      <div className='buttons'>
        <div className={`button like-button ${liked === true && 'active'}`}
             data-toggle='tooltip'
             data-placement='top'
             title='Like'
             onClick={handleLike}
             >
          <LikeIcon/>
          <span className='likes'>{format(totalLikes)}</span>
        </div>
        <div className={`button dislike-button ${liked === false && 'active'}`}
             data-toggle='tooltip'
             data-placement='top'
             title='Dislike'
             onClick={handleDislike}>
          <DislikeIcon/>
          <span className='dislikes'>{format(totalDislikes)}</span>
        </div>
      </div>
      <div className='bar'>
        <div className='like-bar' style={{width:ratio + '%'}}/>
      </div>
    </div>
  );
}

LikeDislikeBar.defaultProps = {
  likes: 12,
  dislikes: 3,
  liked: null,
  onLike: () => {}
}

export default LikeDislikeBar;

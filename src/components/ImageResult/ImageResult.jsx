import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import './ImageResult.css';

function ImageResult() {
  const giphy = useSelector((store) => store.giphy);
  const dispatch = useDispatch();

  const handleFavorite = (index) => (event) => {
    const giphyImage = giphy[index];
    dispatch({
      type: 'SET_FAVORITES',
      payload: {
        url: giphyImage.url,
        alt: giphyImage.alt,
        category_id: 1,
      },
    });
    event.preventDefault();
    console.log('In handleFavorite', giphyImage);
    alert('like button clicked');
  };

  return (
    <div>
      <h3>IMAGE RESULT</h3>
      <ul>
        {giphy.map((giphyImage, index) => {
          return (
            <Grid container spacing={6} key={giphyImage.id}>
              <Grid item className="gridItem">
                <Card>
                  <img src={giphyImage.url} alt={giphyImage.alt} />
                  <IconButton
                    aria-label="add to favorites"
                    onClick={handleFavorite(index)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Card>
              </Grid>
            </Grid>
          );
        })}
      </ul>
    </div>
  );
}

export default ImageResult;

import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const Pagination = ({pageNumber, setPageNumber }) => {
  let next = () => {
    setPageNumber(x => x+1);
  };

  let prev = () => {
    setPageNumber(x => x-1);
  };

  return (
  <Box display='flex' justifyContent="center" sx={{my: 4}}>
    <Button sx={{mx: 2}} variant='outlined' 
      onClick={prev}
      disabled={pageNumber === 1 ? true : false}>
      Previous
    </Button>
    <Button sx={{mx: 2}} variant='outlined' 
      onClick={next}>
      Next
    </Button>
  </Box>
  )
}

export default Pagination;
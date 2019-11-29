import React from 'react';
import { View, Button } from 'react-native';

const Pagination = ({
  showPrevLink,
  showNextLink,
  handlePrevClick,
  handleNextClick
}) => {
  return (
    <View>
      {showPrevLink
        ? <Button title="prev" onPress={handlePrevClick} value="prev">
            Prev
          </Button>
        : null}
      {showNextLink
        ? <Button title="next" onPress={handleNextClick} value="next">
            Next
          </Button>
        : null}
      <Button />
    </View>
  );
};

export default Pagination;

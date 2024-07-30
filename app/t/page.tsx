import QuestionContainer from '@/components/test_taking_components/QuestionContainer'
import ObjectiveMaker from '@/components/test_making_components/ObjectiveMaker'
import OrderingMaker from '@/components/test_making_components/OrderingMaker'
import MatcherMaker from '@/components/test_making_components/MatcherMaker'
import MultiOptionsMaker from '@/components/test_making_components/MultiOptionsMaker'
import ShortAnswerMaker from '@/components/test_making_components/ShortAnswerMaker'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen border'>
      {/* <ObjectiveMaker /> */}
      {/* <OrderingMaker /> */}
      {/* <MatcherMaker /> */}
      {/* <MultiOptionsMaker /> */}
      <ShortAnswerMaker />
      {/* <QuestionContainer /> */}
    </div>
  )
}

export default page
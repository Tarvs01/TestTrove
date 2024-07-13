import QuestionContainer from '@/components/test_taking_components/QuestionContainer'
import ObjectiveMaker from '@/components/test_making_components/ObjectiveMaker'
import OrderingMaker from '@/components/test_making_components/OrderingMaker'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen border'>
      {/* <ObjectiveMaker /> */}
      <OrderingMaker />
        {/* <QuestionContainer /> */}
    </div>
  )
}

export default page
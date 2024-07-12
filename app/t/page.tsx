import QuestionContainer from '@/components/test_taking_components/QuestionContainer'
import ObjectiveMaker from '@/components/test_making_components/ObjectiveMaker'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen border'>
      <ObjectiveMaker />
        {/* <QuestionContainer /> */}
    </div>
  )
}

export default page
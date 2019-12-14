import React from 'react'
import TextBlock from 'core/blocks/other/TextBlock'
import LogoFull from 'core/components/LogoFull'
import SponsorsBlock from 'core/blocks/other/SponsorsBlock'
import NewsletterBlock from 'core/blocks/other/NewsletterBlock'
import IntroductionFooter from 'core/pages/IntroductionFooter'

const SurveyIntroBlock = ({ data, block }) => (
    <div>
        <div className="main-logo-wrapper">
            <LogoFull size="l" />
        </div>
        <TextBlock text={data} />
        <IntroductionFooter />
        <NewsletterBlock />
        <SponsorsBlock />
    </div>
)

export default SurveyIntroBlock

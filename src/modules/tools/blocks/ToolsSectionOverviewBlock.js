import React, { memo, useMemo } from 'react'
import Block from 'core/components/Block'
import { usePageContext } from 'core/helpers/pageContext'
import ToolsOpinionBumpChart from '../charts/tools_opinion_bump_chart/ToolsOpinionBumpChart'
import ToolsOpinionBumpChartLegend from '../charts/ToolsOpinionBumpChartLegend'
import ChartContainer from 'core/charts/ChartContainer'

const ToolsSectionOverviewBlock = ({ data, block }) => {
    const { id, showDescription } = block
    const context = usePageContext()
    const toolsData = useMemo(
        () =>
            context.blocks
                .filter(block => block.type === 'tool')
                .map(block => data.data.aggregations.find(agg => agg.id === block.id)),
        [context.blocks]
    )

    return (
        <Block id={id} showDescription={showDescription}>
            <ChartContainer height={200} fit={true}>
                <ToolsOpinionBumpChart data={toolsData} />
            </ChartContainer>
            <ToolsOpinionBumpChartLegend />
        </Block>
    )
}

export default memo(ToolsSectionOverviewBlock)

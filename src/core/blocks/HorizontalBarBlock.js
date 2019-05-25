import React, { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/components/Block'
import ChartContainer from 'core/charts/ChartContainer'
import HorizontalBarChart from 'core/charts/HorizontalBarChart'
import ChartUnitsSelector from 'core/charts/ChartUnitsSelector'

const getChartData = (data, block) => {
    if (!data || !data.data) {
        throw new Error(
            `HorizontalBarBlock: Missing data for block ${block.id}, page data is undefined`
        )
    }

    const blockData = data.data.aggregations.find(agg => agg.id === block.id)

    if (!blockData) {
        throw new Error(`HorizontalBarBlock: Missing data for block ${block.id}`)
    }
    if (
        blockData[block.dataKey] === undefined ||
        !Array.isArray(blockData[block.dataKey].buckets)
    ) {
        throw new Error(
            `HorizontalBarBlock: Non existing or invalid data key ${block.data.key} for block ${
                block.id
            }`
        )
    }

    return blockData[block.dataKey].buckets
}

const HorizontalBarBlock = ({ block, data }) => {
    const { id, showDescription, units: defaultUnits = 'percentage', translateData } = block
    const [units, setUnits] = useState(defaultUnits)
    const buckets = useMemo(() => getChartData(data, block), [data, block])

    return (
        <Block id={id} showDescription={showDescription}>
            <div className="ChartControls">
                <ChartUnitsSelector units={units} onChange={setUnits} />
            </div>
            <ChartContainer>
                <HorizontalBarChart
                    buckets={buckets}
                    i18nNamespace={id}
                    translateData={translateData}
                    units={units}
                />
            </ChartContainer>
        </Block>
    )
}

HorizontalBarBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        showDescription: PropTypes.bool,
        translateData: PropTypes.bool,
        usePercents: PropTypes.bool
    }).isRequired,
    data: PropTypes.shape({
        data: PropTypes.shape({
            aggregations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default memo(HorizontalBarBlock)

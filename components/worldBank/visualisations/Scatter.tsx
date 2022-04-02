// @ts-nocheck
import { withParentSize } from "@visx/responsive"
import { scaleLog, scaleLinear, scaleSqrt, scaleOrdinal } from "@visx/scale"
import { extent, format } from "d3"
import { Circle } from "@visx/shape"
import { Axis } from "@visx/axis"
import { GridColumns } from "@visx/grid"
import { Delaunay } from "d3-delaunay"
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip"
import { localPoint } from "@visx/event"
import {
  LegendOrdinal,
  LegendSize,
  LegendItem,
  LegendLabel,
} from "@visx/legend"
import { useCallback, useMemo, useRef } from "react"
import styled from "styled-components"
import { useColorScale } from "../hooks"

const ScatterPlot = ({
  data,
  parentWidth,
  parentHeight,
  x,
  y,
  size,
  getColor,
  colorScale,
  margin = { top: 40, left: 40, right: 20, bottom: 50 },
}) => {
  // Accessors
  const getX = (d) => d[x]
  const getY = (d) => d[y]
  const getSize = (d) => d[size]

  // Set dimensions
  const innerWidth = parentWidth - margin.right - margin.left
  const innerHeight = parentHeight - margin.top - margin.bottom

  data = data.sort((a, b) => getSize(b) - getSize(a))

  // Scales
  const xScale = scaleLog({
    range: [margin.left, innerWidth + margin.left],
    domain: extent(data, getX),
  })

  const yScale = scaleLinear({
    range: [innerHeight + margin.top, margin.top],
    domain: extent(data, getY),
    nice: true,
  })

  const sizeScale = scaleSqrt({
    range: [3, 30],
    domain: extent(data, getSize),
  })

  // Handle the tooltip
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip()

  const svgRef = useRef(null)

  const voronoiLayout = useMemo(
    () =>
      Delaunay.from(
        data,
        (d) => xScale(getX(d)),
        (d) => yScale(getY(d))
      ),
    [parentWidth, parentHeight, xScale, yScale]
  )

  let tooltipTimeout

  const handleMouseMove = useCallback(
    (event) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout)
      if (!svgRef.current) return
      const point = localPoint(svgRef.current, event)
      const closest = voronoiLayout.find(point.x, point.y)
      const tooltipPoint = data[closest]

      if (tooltipPoint) {
        showTooltip({
          tooltipLeft: xScale(getX(tooltipPoint)),
          tooltipTop: yScale(getY(tooltipPoint)),
          tooltipData: tooltipPoint,
        })
      }
    },
    [x, y, xScale, yScale, showTooltip, tooltipTimeout]
  )

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip()
    }, 1500)
  }, [hideTooltip])

  const siFormat = format(".2~s")

  const formatBigNumber = (number) =>
    siFormat(number).replace("G", "B").replace("k", "K")

  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: margin.bottom,
          right: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span className='legend-title'>{size}</span>
        <LegendSize scale={sizeScale} steps={3}>
          {(labels) =>
            labels.map((label) => {
              const size = sizeScale(label.datum) ?? 0
              return (
                <LegendItem
                  key={`legend-${label.text}-${label.index}`}
                  margin='5px 0px'
                >
                  <svg width={size * 2} height={size * 2}>
                    <circle
                      fill='transparent'
                      stroke='#a7a9be'
                      fillOpacity={0.2}
                      r={size}
                      cx={size}
                      cy={size}
                    />
                  </svg>
                  <LegendLabel align='right' margin='5px 5px'>
                    {formatBigNumber(label.text)}
                  </LegendLabel>
                </LegendItem>
              )
            })
          }
        </LegendSize>
      </div>
      <svg width={parentWidth} height={parentHeight} ref={svgRef}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='#0B1E31'
          stroke='#a7a9be'
          strokeOpacity={1}
        />
        <GridColumns
          top={margin.top}
          scale={xScale}
          height={innerHeight}
          stroke='#a7a9be'
          strokeOpacity={0.3}
          pointerEvents='none'
          numTicks={2}
        />
        {data.map((d, i) => (
          <Circle
            key={`scatterplot-${i}`}
            cx={xScale(getX(d))}
            cy={yScale(getY(d))}
            r={sizeScale(getSize(d))}
            fill={colorScale(getColor(d))}
            fillOpacity={0.8}
            stroke={tooltipData === d ? "white" : "none"}
          />
        ))}
        <Axis
          orientation='left'
          left={margin.left}
          scale={yScale}
          numTicks={3}
          stroke='#a7a9be'
          tickStroke='#a7a9be'
          label={y}
        />
        <Axis
          orientation='top'
          top={margin.top}
          scale={xScale}
          numTicks={2}
          tickFormat={format("$~s")}
          stroke='#a7a9be'
          tickStroke='#a7a9be'
        />
        <Axis
          orientation='bottom'
          numTicks={2}
          top={innerHeight + margin.top}
          scale={xScale}
          tickFormat={format("$~s")}
          stroke='#a7a9be'
          tickStroke='#a7a9be'
          label={x}
        />
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill='transparent'
          stroke='transparent'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
        />
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={{ ...defaultStyles, margin: 0, fontSize: "1rem" }}
        >
          <div className='tooltip-information'>
            <span
              style={{
                color: colorScale(getColor(tooltipData)),
              }}
            >
              {tooltipData.country_name}
            </span>
            <div className='tooltip-row'>
              <span>{x}</span>
              <span style={{ textAlign: "right" }}>
                {format("$.2~s")(getX(tooltipData))}
              </span>
            </div>
            <div className='tooltip-row'>
              <span>{y}</span>
              <span style={{ textAlign: "right" }}>
                {format(".2~s")(getY(tooltipData))}
              </span>
            </div>
          </div>
        </TooltipWithBounds>
      )}
    </>
  )
}

const Legend = ({ colorScale }) => (
  <div className='legend'>
    <LegendOrdinal scale={colorScale}>
      {(labels) =>
        labels.map((label) => {
          if (label.text === "null") return
          return (
            <LegendItem key={`legend-${label.text}-${label.index}`}>
              <svg width={10 * 2} height={10 * 2}>
                <circle fill={colorScale(label.text)} r={10} cx={10} cy={10} />
              </svg>
              <LegendLabel>{label.text}</LegendLabel>
            </LegendItem>
          )
        })
      }
    </LegendOrdinal>
  </div>
)

const ResponsiveScatter = withParentSize(ScatterPlot)

const scatterPlotWrapper = ({ title, data, x, y, size, color, className }) => {
  const getColor = (d) => d[color]

  const { colorScale } = useColorScale([
    ...new Set(data.map((d) => getColor(d))),
  ])

  return (
    <div className={className}>
      <h3>{title}</h3>
      <Legend colorScale={colorScale} />
      <div className='viz'>
        <ResponsiveScatter
          data={data}
          x={x}
          y={y}
          size={size}
          getColor={getColor}
          colorScale={colorScale}
        />
      </div>
    </div>
  )
}

export default styled(scatterPlotWrapper)`
  left: calc(-35vw + 50%);
  width: 70vw;
  overflow: hidden;

  position: relative;
  color: #a7a9be;
  font-size: 0.8rem;
  margin: 10px 10px 50px 10px;

  .viz {
    height: 550px;
    position: relative;
  }

  .legend-title {
    align-self: flex-start;
  }

  .tooltip-information {
    display: flex;
    flex-direction: column;
  }

  .tooltip-row {
    display: grid;
    max-width: 200px;
    grid-template-columns: 4fr 1fr;
    grid-template-rows: 1fr;
  }

  svg text {
    fill: #a7a9be;
    font-size: 0.8rem;
  }

  .legend {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-around;
    gap: 2px;
  }

  @media only screen and (max-width: 1000px) {
    width: 100%;
    left: 0px;

    .viz {
      height: 500px;
    }

    .legend {
      grid-template-columns: 1fr 1fr;
    }
  }
`

package main

import (
    "fmt"
    "math"
    "os"
    "strconv"
)

func main() {
    input, _ := strconv.ParseFloat(os.Args[1], 64)

    sLength := math.Ceil(math.Sqrt(input))
    if math.Mod(sLength, 2) == 0 {
        sLength += 1
    }
    fmt.Println("Side Length:", sLength)

    halfSLength := math.Ceil(sLength / 2) - 1
    fmt.Println("Steps from corner to midline:", halfSLength)

    iSteps := halfSLength
    fmt.Println("Internal steps to Center:", iSteps)

    distanceFromCorner := (sLength * sLength) - input
    fmt.Println("Distance from furthest corner:", distanceFromCorner)

    // Walk back along the outside till we are on the same side as input
    for distanceFromCorner > (sLength - 1) {
        distanceFromCorner = distanceFromCorner - (sLength - 1)
    }
    fmt.Println("Furthest distance from corner:", distanceFromCorner)

    if distanceFromCorner > halfSLength {
        distanceFromCorner = (sLength - 1) - distanceFromCorner
    }

    fmt.Println("Shortest distance from corner:", distanceFromCorner)

    eSteps := halfSLength - distanceFromCorner
    fmt.Println("External steps to Center:", eSteps)


    steps := eSteps + iSteps


    fmt.Println("Steps to Center:", steps)
}

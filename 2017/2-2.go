package main

import (
    "fmt"
    "os"
    "strings"
    "sort"
    "bufio"
    "strconv"
    "math"
)

func main() {
    dataFile, err := os.Open("2.data")
    if err != nil {
        panic(err)
    }

    var total float64 = 0

    scanner := bufio.NewScanner(dataFile)
    for scanner.Scan() {
        values := stringToFloatArray(scanner.Text())

        for index, value := range values {
            for x := index + 1; x < len(values); x++ {
                if math.Mod(value, values[x]) == 0 {
                    total += value / values[x]
                }
            }
        }
    }

    fmt.Println("Total:", total)
}

func stringToFloatArray(text string) []float64 {
    var valueList []float64

    for _, value := range strings.Split(text, " ") {
        floatValue, err := strconv.ParseFloat(value, 64)

        if err != nil {
            panic(err)
        }

        valueList = append(valueList, floatValue)
    }

    sort.Sort(sort.Reverse(sort.Float64Slice(valueList)))
    return valueList
}

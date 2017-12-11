package main

import (
    "fmt"
    "os"
    "strings"
    "sort"
    "bufio"
    "strconv"
)

func main() {
    dataFile, err := os.Open("2.data")
    if err != nil {
        panic(err)
    }

    total := 0

    scanner := bufio.NewScanner(dataFile)
    for scanner.Scan() {
        values := stringToIntArray(scanner.Text())

        sort.Ints(values)
        total += values[len(values) - 1] - values[0]
    }

    fmt.Println("Total:", total)
}

func stringToIntArray(text string) []int {
    var valueList []int

    for _, value := range strings.Split(text, " ") {
        intValue, err := strconv.Atoi(value)

        if err != nil {
            panic(err)
        }

        valueList = append(valueList, intValue)
    }

    return valueList
}

package main

import (
    "bufio"
    "os"
    "fmt"
    "strings"
    "strconv"
)

func main() {
    dataFile, err := os.Open("1.data")
    if err != nil {
        panic(err)
    }

    scanner := bufio.NewScanner(dataFile)
    var sequence string
    for scanner.Scan() {
        sequence = scanner.Text()
    }

    sequenceList := strings.Split(sequence, "")

    total := 0
    sequenceLength := len(sequenceList)
    maxIndex := sequenceLength - 1
    indexGap := sequenceLength/2

    for index, value := range sequenceList {
        compareToIndex := index + indexGap
        if compareToIndex > maxIndex {
            compareToIndex = (indexGap - (maxIndex - index)) - 1
        }

        if value == sequenceList[compareToIndex] {
            int_value, _ := strconv.Atoi(value)
            total += int_value
        }
    }

    fmt.Println("Sequence Length:", sequenceLength)
    fmt.Println("Max Index:", maxIndex)
    fmt.Println("Index Gap:", indexGap)

    fmt.Println("Total: ", total)
}

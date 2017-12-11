package main

import (
    "fmt"
    "os"
    "bufio"
    "strconv"
)

func main() {
    dataFile, err := os.Open("5.data")
    if err != nil {
        panic(err)
    }

    scanner := bufio.NewScanner(dataFile)
    var values []int
    for scanner.Scan() {
        value, _ := strconv.Atoi(scanner.Text())
        values = append(values, value)
    }

    index := 0
    jumps := 0
    fmt.Println("Maze has", len(values), "elements")
    for {
        fmt.Println("checking index", index)

        if index >= len(values) {
            break
        }

        value := values[index]
        fmt.Println("Value at index", index, "is", value)

        values[index]++

        fmt.Println("Jumping:", value)
        index += value
        jumps++
    }

    fmt.Println("Total:", jumps)
}

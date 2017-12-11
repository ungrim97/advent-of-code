package main

import (
    "fmt"
    "os"
    "strings"
    "bufio"
)

func main() {
    dataFile, err := os.Open("4.data")
    if err != nil {
        panic(err)
    }

    total := 0

    scanner := bufio.NewScanner(dataFile)
    for scanner.Scan() {
        values := strings.Split(scanner.Text(), " ")
        fmt.Println("Total words in phrase:", len(values))

        var passes bool = true
        for index, value := range values {

            for x := index + 1; x < len(values); x++ {
                if value == values[x] {
                    passes = false
                }
            }

        }

        if passes {
            total++
        }
    }

    fmt.Println("Total:", total)
}


var leastInterval = function(tasks, n) {
    // Create a frequency array to keep track of the count of each task
    const freq = Array(26).fill(0);
    for (const task of tasks) {
      freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
    }
    // Sort the frequency array in non-decreasing order
    freq.sort((a, b) => a - b);
    // Calculate the maximum frequency of any task
    const maxFreq = freq[25] - 1;
    // Calculate the number of idle slots that will be required
    let idleSlots = maxFreq * n;
    // Iterate over the frequency array from the second highest frequency to the lowest frequency
    for (let i = 24; i >= 0 && freq[i] > 0; i--) {
      // Subtract the minimum of the maximum frequency and the current frequency from the idle slots
      idleSlots -= Math.min(maxFreq, freq[i]);
    }
    // If there are any idle slots left, add them to the total number of tasks
    return idleSlots > 0 ? idleSlots + tasks.length : tasks.length;
  }
  
  document.getElementById("submit").addEventListener("click", calculateTaskScheduling);
  
  document.getElementById("intervalsInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      calculateTaskScheduling();
    }
  });
  
  function calculateTaskScheduling() {
    const input = document.getElementById("intervalsInput").value.trim();
    // Extract tasks and n from input
    const matches = input.match(/\[(.*?)\],\s*n\s*=\s*(\d+)/);
    if (matches && matches.length === 3) {
      const tasks = matches[1].split(",").map(task => task.trim());
      const n = parseInt(matches[2]);
      // Call leastInterval function with tasks and n
      const result = leastInterval(tasks, n);
      document.getElementById("output").innerText = "Output: " + result;
    } else {
      document.getElementById("output").innerText = "Invalid input format!";
    }
  }
  
  // Add this script to clear the input field on page load
  document.addEventListener('DOMContentLoaded', function() {
    var intervalsInput = document.getElementById('intervalsInput');
    intervalsInput.value = ''; // Set the input value to an empty string
  });
  
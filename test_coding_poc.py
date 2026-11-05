"""Unit tests for :func:`coding_poc.add`."""

import unittest

from coding_poc import add


class TestAdd(unittest.TestCase):
    """Verify addition with positive numbers, negative numbers, and zero."""

    def test_positive_numbers(self) -> None:
        self.assertEqual(add(2, 3), 5)

    def test_negative_numbers(self) -> None:
        self.assertEqual(add(-2, -3), -5)

    def test_zero(self) -> None:
        self.assertEqual(add(0, 0), 0)
        self.assertEqual(add(4, 0), 4)
        self.assertEqual(add(0, -4), -4)


if __name__ == "__main__":
    unittest.main()

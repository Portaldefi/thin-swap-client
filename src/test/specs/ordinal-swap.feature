Feature: Ordinal swap

  Scenario: Step 1 - Matching bid and ask create swap
    Given Alice has an ordinal padded to 10,000 sats
    And Bob has 100,000 sats on lightning network
    When Alice asks for 100,000 sats in exchange for ordinal padded to 8000 sats
    And Bob bids 100,000 sats for the same ordinal padded to 8000
    Then Swap is created
    And Event sent signaling swap creation

  Scenario: Step 2 - SecretHolder Alice opens swap
    Given Alice requests that the swap be opened
    Then Swap is opened for Alice
    And Event sent signaling swap opened for Alice

  Scenario: Step 3 - SecretSeeker Bob opens swap
    Given Bob requests that the swap be opened
    Then Swap is opened for Bob
    And Event sent signaling swap opened for Bob
    And Bitcoin address is displayed to Alice

  Scenario: Step 4 - Alice sends ordinal payment
    Given Alice sends ordinal to displayed bitcoin address
    Then Event sent signaling payment sent

  Scenario: Step 5 - Alice's payment is confirmed
    Given 1 block confirmation
    And Padding is 8000 sats
    Then Event sent signaling payment confirmed

  Scenario: Step 6 - Bob commits swap
    Given Bob requests that the swap be committed
    Then Swap is completed
    And Event sent to both Alice and Bob signaling swap is complete
    And Alice receives 100,000 sats on lightning
    And Bob receives ordinal padded to 6000 sats

